import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

async function goToStep1() {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: /get started/i }));
  return user;
}

describe('App step navigation', () => {
  it('starts on the welcome screen with no back/continue row', () => {
    render(<App />);
    expect(screen.getByText(/welcome to nourish/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /continue/i })).not.toBeInTheDocument();
  });

  it('disables Continue on step 1 until age, weight, and height are filled', async () => {
    const user = await goToStep1();
    const continueBtn = screen.getByRole('button', { name: /continue/i });
    expect(continueBtn).toBeDisabled();

    await user.type(screen.getByPlaceholderText('28'), '30');
    expect(continueBtn).toBeDisabled();

    await user.type(screen.getByPlaceholderText('160'), '150');
    expect(continueBtn).toBeDisabled();

    await user.type(screen.getByPlaceholderText('67'), '65');
    expect(continueBtn).toBeEnabled();
  });

  it('navigates back to the previous step', async () => {
    const user = await goToStep1();
    expect(screen.getByText(/about you/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /back/i }));
    expect(screen.getByText(/welcome to nourish/i)).toBeInTheDocument();
  });

  it('requires a budget before allowing plan generation on step 3', async () => {
    const user = await goToStep1();
    await user.type(screen.getByPlaceholderText('28'), '30');
    await user.type(screen.getByPlaceholderText('160'), '150');
    await user.type(screen.getByPlaceholderText('67'), '65');
    await user.click(screen.getByRole('button', { name: /continue/i }));
    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(screen.getByText(/diet & budget/i)).toBeInTheDocument();
    const generateBtn = screen.getByRole('button', { name: /generate my plan/i });
    expect(generateBtn).toBeDisabled();

    await user.type(screen.getByPlaceholderText('300'), '400');
    expect(generateBtn).toBeEnabled();
    expect(screen.getByText(/≈ \$100\/week/)).toBeInTheDocument();
  });

  it('toggles dietary restriction chips on and off', async () => {
    const user = await goToStep1();
    await user.type(screen.getByPlaceholderText('28'), '30');
    await user.type(screen.getByPlaceholderText('160'), '150');
    await user.type(screen.getByPlaceholderText('67'), '65');
    await user.click(screen.getByRole('button', { name: /continue/i }));
    await user.click(screen.getByRole('button', { name: /continue/i }));

    const veganChip = screen.getByRole('button', { name: /vegan/i });
    await user.click(veganChip);
    await user.click(veganChip);
  });
});
