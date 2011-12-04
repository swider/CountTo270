class User
  include MongoMapper::Document

  key :first_name,  String,   :required => true
  key :last_name,   String,   :required => true
  key :fb_id,       Integer
  key :slug,        String,   :unique => true
  key :email,       String

  # TODO: Move login logic here
  def authenticate(fb_user)
    
    
  end

end
