class Ballot
  include MongoMapper::Document

  key :slug, String,   :unique => true
  key :user_slug, String
  key :name, String
  key :map_slug, String
  key :public, Boolean
  key :votes, String

end
