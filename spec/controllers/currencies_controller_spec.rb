# frozen_string_literal: true

# spec/controllers/api/v1/currencies_controller_spec.rb
require 'rails_helper'

RSpec.describe Api::V1::CurrenciesController, type: :controller do
  describe 'GET #index' do
    it 'returns a success response' do
      get :index
      expect(response).to have_http_status(:success)
    end

    it 'assigns @currencies' do
      currency = Currency.create(
        asset_id: 'BTC',
        name: 'Bitcoin',
        type_is_crypto: 1
      )
      get :index
      expect(assigns(:currencies)).to eq([currency])
    end

    it 'renders JSON response' do
      currency = Currency.create(
        asset_id: 'BTC',
        name: 'Bitcoin',
        type_is_crypto: 1
      )
      get :index
      expect(currency.content_type).to eq('application/json; charset=utf-8')
    end

    it 'rescues from errors and renders unprocessable entity' do
      allow(CurrencyService).to receive(:fetch_currencies).and_raise(StandardError.new('Some error'))
      get :index
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)['error']).to eq('Some error')
    end
  end

  describe 'GET #show' do
    let(:currency) do
      Currency.create(
        asset_id: 'BTC',
        name: 'Bitcoin',
        type_is_crypto: 1
      )
    end

    it 'returns a success response' do
      get :show, params: { id: currency.id }
      expect(response).to have_http_status(:success)
    end

    it 'assigns the requested currency as @currency' do
      get :show, params: { id: currency.id }
      expect(assigns(:currency)).to eq(currency)
    end
  end
end
