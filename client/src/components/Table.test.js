import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "./Table"; // Asegúrate de importar el componente Table desde el archivo correcto

jest.mock("../assets", () => ({
  ada: "path/to/mock/ada.png",
  btc: "path/to/mock/btc.png",
  eth: "path/to/mock/eth.png",
}));

const mockInvestments = [
  { currency: "BTC", final_balance: 1000, profit: 500, initial_balance: 500 },
  { currency: "ETH", final_balance: 800, profit: 300, initial_balance: 500 },
];

describe("Table component", () => {
  it("renders correctly and fetches data on mount", async () => {
    const coins = [
      { asset_id: "BTC", name: "Bitcoin", price_usd: 50000 },
      { asset_id: "ETH", name: "Ethereum", price_usd: 3000 },
    ];

    const fetchInvestmentsMock = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockInvestments),
    });

    const { getByText } = render(
      <Table coins={coins} fetchInvestments={fetchInvestmentsMock} />,
    );

    expect(getByText("Tabla de Criptomonedas Disponibles")).toBeInTheDocument();

    await waitFor(() => expect(fetchInvestmentsMock).toHaveBeenCalled());

    expect(getByText("BTC")).toBeInTheDocument();
    expect(getByText("Bitcoin")).toBeInTheDocument();
    expect(getByText("$1000.00")).toBeInTheDocument();
    expect(getByText("$500.00")).toBeInTheDocument();
    expect(getByText("ETH")).toBeInTheDocument();
    expect(getByText("Ethereum")).toBeInTheDocument();
    expect(getByText("$800.00")).toBeInTheDocument();
    expect(getByText("$300.00")).toBeInTheDocument();
  });

  it("handles input change correctly", () => {
    const coins = [
      { asset_id: "BTC", name: "Bitcoin", price_usd: 50000 },
      { asset_id: "ETH", name: "Ethereum", price_usd: 3000 },
    ];

    const fetchInvestmentsMock = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockInvestments),
    });

    const { getByPlaceholderText } = render(
      <Table coins={coins} fetchInvestments={fetchInvestmentsMock} />,
    );

    const btcInput = getByPlaceholderText("500");
    fireEvent.change(btcInput, { target: { value: "1000" } });

    expect(btcInput).toHaveValue("1000");
  });
});
