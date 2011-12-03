class Candidate
  include MongoMapper::Document

  key :first_name, String
  key :last_name, String
  key :slug, String,   :unique => true
  key :party_slug, String

end
