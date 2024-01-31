# frozen_string_literal: true

require 'rails_helper'

RSpec.describe InvestmentsController, type: :controller do
  describe 'POST #calculate' do
    context 'when CSV file exists' do
      let(:csv_file) { fixture_file_upload('origen.csv', 'text/csv') }
      it 'returns HTTP success' do
        post :calculate, params: { file: csv_file }
        expect(response).to have_http_status(:success)
      end
      it 'returns JSON data' do
        post :calculate, params: { file: csv_file }
        expect(JSON.parse(response.body)).not_to be_empty
      end
    end
    context 'when CSV file does not exist' do
      it 'returns HTTP unprocessable_entity' do
        post :calculate
        expect(response).to have_http_status(:unprocessable_entity)
      end
      it 'returns error message' do
        post :calculate
        expect(JSON.parse(response.body)['error']).to eq('No file provided')
      end
    end
  end
  describe 'POST #recaulculate_roi' do
    let(:input_data) { { 'BTC' => '100', 'ETH' => '200' } }
    context 'when CSV file exists' do
      let(:csv_file) { fixture_file_upload('origen.csv', 'text/csv') }
      it 'returns HTTP success' do
        post :recaulculate_roi, params: { file: csv_file }, body: input_data.to_json
        expect(response).to have_http_status(:success)
      end
      it 'returns JSON data' do
        post :recaulculate_roi, params: { file: csv_file }, body: input_data.to_json
        expect(JSON.parse(response.body)).not_to be_empty
      end
    end
    context 'when CSV file does not exist' do
      it 'returns HTTP unprocessable_entity' do
        post :recaulculate_roi, body: input_data.to_json
        expect(response).to have_http_status(:unprocessable_entity)
      end
      it 'returns error message' do
        post :recaulculate_roi, body: input_data.to_json
        expect(JSON.parse(response.body)['error']).to eq('No file provided')
      end
    end
  end
end
