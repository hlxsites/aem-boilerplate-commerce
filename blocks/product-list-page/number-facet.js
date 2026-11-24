import { events } from '@dropins/tools/event-bus.js';
import { search } from '@dropins/storefront-product-discovery/api.js';

const attribute = 'number_attribute';
const scope = 'number-attribute-facets';

export default function createNumberFacetProps() {
  let request;
  let bounds;
  let context;

  const normalize = (payload) => {
    request = payload.request;
    const filters = request.filter || [];
    const nextContext = JSON.stringify({
      phrase: request.phrase,
      filter: filters.filter((filter) => filter.attribute !== attribute)
        .sort((a, b) => a.attribute.localeCompare(b.attribute)),
    });
    if (nextContext !== context) {
      bounds = undefined;
      context = nextContext;
    }

    const facets = payload.result.facets || [];
    const facet = facets.find((item) => item.attribute === attribute);
    const range = filters.find((filter) => filter.attribute === attribute)?.range;
    const stats = facet?.buckets.find((bucket) => bucket.__typename === 'StatsBucket');
    const validStats = Number.isFinite(stats?.min)
      && Number.isFinite(stats?.max) && stats.min <= stats.max;
    if (!range && !validStats) bounds = undefined;
    if (validStats && (!range || !bounds)) {
      bounds = { min: stats.min, max: stats.max, title: facet.title };
    }
    if (!bounds || (!facet && !range)) return payload.result;

    const from = range?.from ?? bounds.min;
    const to = range ? range.to ?? null : bounds.max;
    // The native container must see a matching bucket to preserve arbitrary ranges
    // when another facet changes, and to support its remove/clear-all buttons.
    const numericFacet = {
      title: facet?.title || bounds.title,
      attribute,
      buckets: [{
        __typename: 'RangeBucket',
        title: `${from}-${to ?? bounds.max}`,
        from,
        to,
        count: payload.result.totalCount,
      }],
    };
    return {
      ...payload.result,
      facets: facet
        ? facets.map((item) => (item.attribute === attribute ? numericFacet : item))
        : [...facets, numericFacet],
    };
  };

  events.on('search/result', (payload) => {
    if (payload.numberFacetAdapter) return;
    const result = normalize(payload);
    events.emit('search/result', { ...payload, result, numberFacetAdapter: true }, { scope });
  }, { eager: true });

  events.on('search/result', (payload) => {
    if (payload.numberFacetAdapter) return;
    const result = normalize(payload);
    // Event delivery uses asynchronous BroadcastChannels, so mark forwarded
    // payloads rather than relying on a synchronous recursion guard.
    events.emit('search/result', { ...payload, numberFacetAdapter: true });
    events.emit('search/result', { ...payload, result, numberFacetAdapter: true }, { scope });
  }, { scope });

  ['search/loading', 'search/error'].forEach((event) => {
    events.on(event, (payload) => events.emit(event, payload), { scope });
  });

  return {
    scope,
    slots: {
      Facet: (ctx, element) => {
        const text = ctx.dictionary.Search?.Facet || {};
        const wrapper = document.createElement('fieldset');
        wrapper.className = 'search__number-facet';
        const heading = document.createElement('legend');
        wrapper.appendChild(heading);

        const values = document.createElement('div');
        values.className = 'search__number-facet-values';
        const slider = document.createElement('div');
        slider.className = 'search__number-facet-slider';
        const id = `${attribute}-${crypto.randomUUID()}`;
        const inputs = ['minimum', 'maximum'].map((name) => {
          const label = document.createElement('label');
          const caption = document.createElement('span');
          caption.textContent = text[name] || (name === 'minimum' ? 'Minimum' : 'Maximum');
          const output = document.createElement('output');
          const input = document.createElement('input');
          input.type = 'range';
          input.step = '0.5';
          input.id = `${id}-${name}`;
          label.htmlFor = input.id;
          output.htmlFor = input.id;
          label.append(caption, output);
          values.appendChild(label);
          slider.appendChild(input);
          return { input, output };
        });
        wrapper.append(values, slider);
        const reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'button secondary';
        reset.textContent = text.resetRange || 'Reset range';
        const error = document.createElement('p');
        error.className = 'search__number-facet-error';
        error.setAttribute('role', 'alert');
        wrapper.append(reset, error);

        const updateTrack = () => {
          const min = Number(inputs[0].input.min);
          const max = Number(inputs[0].input.max);
          const from = Number(inputs[0].input.value);
          const to = Number(inputs[1].input.value);
          const span = max - min;
          slider.style.setProperty('--range-start', `${span ? ((from - min) / span) * 100 : 0}%`);
          slider.style.setProperty('--range-end', `${span ? ((to - min) / span) * 100 : 100}%`);
          inputs[0].input.setAttribute('aria-valuemax', to);
          inputs[1].input.setAttribute('aria-valuemin', from);
          // At the upper endpoint, keep the minimum handle reachable when they overlap.
          inputs[0].input.style.zIndex = from === max ? 3 : '';
        };

        const update = (next) => {
          const active = next.data.attribute === attribute && !!bounds;
          wrapper.hidden = !active;
          const original = element?.querySelector('.product-discovery-facet');
          if (original) original.hidden = active;
          if (!active) {
            inputs.forEach(({ input }) => input.removeAttribute('name'));
            return;
          }
          heading.textContent = next.data.title;
          const bucket = next.data.buckets[0];
          inputs.forEach(({ input, output }, index) => {
            input.name = `${attribute}-${index === 0 ? 'minimum' : 'maximum'}`;
            input.min = Math.min(bounds.min, bucket.from);
            input.max = Math.max(bounds.max, bucket.to ?? bounds.max);
            input.value = index === 0 ? bucket.from : bucket.to ?? bounds.max;
            input.disabled = input.min === input.max;
            output.value = input.value;
          });
          updateTrack();
          reset.disabled = !request.filter?.some((filter) => filter.attribute === attribute);
        };

        const apply = (range) => {
          const filter = (request.filter || []).filter((item) => item.attribute !== attribute);
          if (range) filter.push({ attribute, range });
          error.textContent = '';
          search({ ...request, filter, currentPage: 1 }).catch((reason) => {
            console.error('Error filtering number attribute', reason);
            error.textContent = text.rangeError || 'Unable to apply the range. Please try again.';
          });
        };

        inputs.forEach(({ input, output }, index) => {
          input.addEventListener('input', () => {
            const other = Number(inputs[1 - index].input.value);
            input.value = index === 0
              ? Math.min(Number(input.value), other) : Math.max(Number(input.value), other);
            output.value = input.value;
            updateTrack();
          });
          input.addEventListener('change', () => {
            const from = Number(inputs[0].input.value);
            const to = Number(inputs[1].input.value);
            // SearchRangeInput.to is exclusive. Leave the top endpoint unbounded
            // so a product whose value equals StatsBucket.max is not excluded.
            const range = { from, to: to === bounds.max ? null : to };
            apply(from === bounds.min && to === bounds.max ? undefined : range);
          });
        });
        reset.addEventListener('click', () => apply());
        update(ctx);
        ctx.appendChild(wrapper);
        ctx.onChange(update);
      },
    },
  };
}
