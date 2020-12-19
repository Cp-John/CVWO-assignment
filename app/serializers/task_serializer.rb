class TaskSerializer
  include FastJsonapi::ObjectSerializer
  
  attributes :title, :description, :status, :due_date, :created_at, :updated_at, :id, :priority
end
