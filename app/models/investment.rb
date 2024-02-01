
# frozen_string_literal: true

require 'csv'

class Investment
  attr_reader :currency, :monthly_interest, :initial_balance, :price_usd

  def initialize(currency, monthly_interest, initial_balance, price_usd)
    @currency = currency
    @monthly_interest = monthly_interest.to_f / 100
    @initial_balance = initial_balance.to_f
    @price_usd = price_usd
  end

  def calculate_profit
    yearly_interest = (1 + @monthly_interest)**12 - 1
    final_balance = @initial_balance * (1 + yearly_interest)
    crypto_total =  final_balance / @price_usd  
    profit = final_balance - @initial_balance
    { currency: @currency, final_balance: final_balance, profit: profit, initial_balance: @initial_balance, crypto_total: crypto_total }
  end
end
