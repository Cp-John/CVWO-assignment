class CategorySerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :id

  has_many :tasks
end
