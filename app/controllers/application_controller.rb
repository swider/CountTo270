class ApplicationController < ActionController::Base
  
  before_filter :authenticate
  
  protect_from_forgery
  
  
  def authenticate
    fb_cookie = cookies[:fbs_249679251759732]
    if session[:loggedin].blank? then
      if fb_cookie.blank? then
        # Not Logged In
        logger.info '>>> Unknown user'
      else
        # Just logged in
        cookie = get_facebook_cookie(fb_cookie)
        if cookie.blank? then
          # Auth failed
          logger.info '>>> Auth failed!'
        else
          # Auth success!
          user = JSON.parse open('https://graph.facebook.com/me?access_token=' + cookie['access_token']).read
          session[:loggedin] = true
          session[:fb_token] = '249679251759732|'+cookie['session_key']
          session[:name] = user['name']
          session[:fb_id] = user['id']
          session[:username] = user['username']
          #{
          #   "id": "6850335",
          #   "name": "Nick Swider",
          #   "first_name": "Nick",
          #   "last_name": "Swider",
          #   "link": "http://www.facebook.com/nickswider",
          #   "username": "nickswider",
          #   "hometown": {
          #      "id": "110648162288620",
          #      "name": "Milwaukee, Wisconsin"
          #   },
          #   "location": {
          #      "id": "104068442962662",
          #      "name": "Silver Spring, Maryland"
          #   },
          #   "gender": "male",
          #   "email": "barclay\u0040fleet54.com",
          #   "timezone": -5,
          #   "locale": "en_US",
          #   "verified": true,
          #   "updated_time": "2011-06-23T05:44:50+0000"
          #}
          logger.info '>>> Now logged in as: ' + session[:username]
        end
      end
    else
      # Alredy logged in
      logger.info '>>> Already logged in as '+session[:username]
    end
  end
  
  def get_facebook_cookie(cookie)
    chars = '\\"'
  	args = Rack::Utils.parse_nested_query cookie.gsub(/^[#{chars}]+|[#{chars}]+$/, '')
  	payload = 'access_token='+args['access_token']+'expires='+args['expires']+'secret='+args['secret']+'session_key='+args['session_key']+'uid='+args['uid']
    if Digest::MD5.hexdigest(payload + 'bf064d432260671ac29f696c22479a40') != args['sig'] then
  		return ''
  	end
  	return args
  end
  
end
