/** https://preactjs.com/guide/v10/preact-testing-library/ */
import { render, screen } from '@adobe/elsie/lib/tests';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Button } from '@/auth/components/Button';
describe('[AUTH-UI] - Button', () => {
    test('renders', () => {
        const { container } = render(<Button type="button" buttonText="Text"/>);
        expect(!!container).toEqual(true);
    });
    test('renders with required buttonText and type button', () => {
        const buttonText = 'Click Me';
        render(<Button buttonText={buttonText} type="button"/>);
        const button = screen.getByRole('button', { name: buttonText });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('type', 'button');
    });
    test('calls onClick when button is clicked', async () => {
        const onClick = jest.fn();
        render(<Button buttonText="Click Me" type="button" onClick={onClick}/>);
        await userEvent.click(screen.getByRole('button', { name: 'Click Me' }));
        expect(onClick).toHaveBeenCalled();
    });
    test('displays loader when enableLoader is true', () => {
        render(<Button buttonText="Loading..." type="button" enableLoader={true}/>);
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
        const loader = document.querySelector('.auth-button__loader');
        expect(loader).toBeInTheDocument();
    });
    test('applies custom className and style', () => {
        const style = { backgroundColor: 'blue' };
        const className = 'custom-button-class';
        render(<Button buttonText="Styled Button" type="button" style={style} className={className}/>);
        const button = screen.getByRole('button', { name: 'Styled Button' });
        expect(button).toHaveClass('auth-button', className);
        expect(button).toHaveStyle('background-color: blue;');
    });
});
