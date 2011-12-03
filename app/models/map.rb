class Map
  include MongoMapper::Document

  key :name, String
  key :slug, String,   :unique => true
  key :svg, String

end
