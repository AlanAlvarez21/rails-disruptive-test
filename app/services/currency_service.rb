require 'uri'
require 'net/http'
class CurrencyService
    include ApiConstants
  
    def self.fetch_currencies
      assets = Currency.pluck(:title).join(',')
      url = URI("#{COIN_API_URL}/#{assets}")
      https = Net::HTTP.new(url.host, url.port)
      https.use_ssl = true
  
      request = Net::HTTP::Get.new(url)
      request['Accept'] = 'text/plain'
      request['X-CoinAPI-Key'] = COIN_API_KEY
  
      response = https.request(request)
  
      unless response.is_a?(Net::HTTPSuccess)
        raise StandardError, "Error al obtener las monedas: #{response.code} #{response.message}"
      end
  
      response.read_body
    end
end
  