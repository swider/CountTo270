class Party
  include MongoMapper::Document

  key :slug, String,   :unique => true
  key :name, String
  key :color, String

end
