import React, {useEffect, useState} from 'react';

import {
  defaultTheme,
  Provider,
  ListView,
  Item,
  Text,
  Heading,
  Content,
  Breadcrumbs,
  ActionButton,
  Flex,
  Picker as RSPicker,
  View,
  IllustratedMessage
} from '@adobe/react-spectrum';
import NotFound from '@spectrum-icons/illustrations/NotFound';
import Error from '@spectrum-icons/illustrations/Error';
import Copy from '@spectrum-icons/workflow/Copy';
import Settings from '@spectrum-icons/workflow/Settings';


const Picker = props => {
  const {blocks, configFiles, getCustomerSegments, defaultConfig} = props;

  const [state, setState] = useState({
    configs: {},
    selectedConfig: null,
    customerSegments: [],
    selectedSegment: null,
    loadingState: 'loading',
    block: null,
    disabledKeys: new Set(),
    selectedItems: new Set(),
    showSettings: false,
    error: null,
  });

  const activeConfig = state.selectedConfig ? state.configs[state.selectedConfig] : null;

  const clickListItem = (key) => {
    setState(state => ({
      ...state,
      selectedSegment: key,
    }));
    copyToClipboard(key);
  }

  const copyToClipboard = (key) => {
    navigator.clipboard.writeText(key ?? '');
  };

  const renderEmptyState = () => (
    <IllustratedMessage>
      <NotFound/>
      <Heading>No items found</Heading>
    </IllustratedMessage>
  );

  const renderErrorState = () => (
    <IllustratedMessage>
      <Error/>
      <Heading>Something went wrong</Heading>
      <Content>{state.error}</Content>
    </IllustratedMessage>
  );

  const toggleSettings = () => {
    setState(state => ({
      ...state,
      showSettings: !state.showSettings,
    }));
  }

  const changeSelectedConfig = (config) => {
    setState(state => ({
      ...state,
      selectedConfig: config,
      customerSegments: [],
      loadingState: 'loading',
      disabledKeys: new Set(),
      selectedItems: new Set(),
    }));
  }

  const fetchConfig = async (env) => {
    const configData = await fetch(configFiles[env]).then(r => r.json());
    let config = {};
    configData.data.forEach(e => {
      config[e.key] = e.value;
    });
    return config;
  }

  useEffect(() => {
    (async () => {
      const selectedConfig = defaultConfig || Object.keys(configFiles)[0];

      // Get configs and select default config
      let configs = {};
      try {
        const promises = await Promise.all(Object.keys(configFiles).map(async key => {
          return [key, await fetchConfig(key)];
        }));
        configs = Object.fromEntries(promises);
      } catch (err) {
        console.error(err);
        setState(state => ({
          ...state,
          error: `Could not load ${selectedConfig} config file`,
        }));
        return;
      }

      setState(state => ({
        ...state,
        configs,
        selectedConfig,
        loadingState: 'loading',
        disabledKeys: new Set(),
        selectedItems: new Set(),
      }));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!activeConfig) {
        return;
      }

      let customerSegments = [];
      try {
        customerSegments = await getCustomerSegments(activeConfig);
      } catch (err) {
        console.error(err);
        setState(state => ({
          ...state,
          error: 'Could not load customer segments',
        }));
        return;
      }

      setState(state => {
        return {
          ...state,
          customerSegments: customerSegments,
          loadingState: 'idle',
        }
      });
    })();
  }, [state.selectedConfig])

  if (state.error) {
    return <Provider theme={defaultTheme} height="100%">
      <Flex direction="column" height="100%">
        <View padding="size-500">
          {renderErrorState()}
        </View>
      </Flex>
    </Provider>;
  }

  return <Provider theme={defaultTheme} height="100%">
    <Flex direction="column" height="100%">
      {
        state.showSettings &&
        <View padding="size-100">
          <RSPicker label="Configuration"
                    isRequired
                    width="100%"
                    selectedKey={state.selectedConfig}
                    onSelectionChange={key => changeSelectedConfig(key)}>
            {Object.keys(state.configs).map(key => (
              <Item key={key} value={key}>{key}</Item>
            ))}
          </RSPicker>
        </View>
      }
      <View padding="size-100">
        <Flex direction="row" gap="size-100">
          <ActionButton aria-label="Settings" isQuiet onPress={toggleSettings}>
            <Settings/>
          </ActionButton>
          <ActionButton isDisabled={state.selectedSegment === null} aria-label="Copy"
                        onPress={() => copyToClipboard(state.selectedSegment)}>
            <Copy/>
          </ActionButton>
          {/*}*/}
        </Flex>
      </View>
      <Breadcrumbs onAction={clickListItem}>
        <Item key="customer_segments">Customer Segments</Item>
      </Breadcrumbs>
      <ListView aria-label="List of Customer Segments"
                items={state.customerSegments}
                loadingState={state.loadingState}
                width="100%"
                height="100%"
                density="spacious"
                onAction={clickListItem}
                renderEmptyState={renderEmptyState}
      >
        {item => {
          return (
            <Item>
              <Text><span dangerouslySetInnerHTML={{__html: item.name}}/></Text>
              {/*{currentBlock.selection === 'single' && (currentBlock.type === 'any' || currentBlock.type === 'item') &&*/}
              {/*  <ActionButton aria-label="Copy" onPress={() => copyToClipboard(item.key)}><Copy/></ActionButton>}*/}
            </Item>
          );
        }}
      </ListView>
    </Flex>
  </Provider>;
}

export default Picker;