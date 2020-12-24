class Task < ApplicationRecord
    belongs_to :category
    before_create :preprocess

    def preprocess
        if self.description == '' || !self.description
            self.description = "no description"
        end

        if self.title == '' || !self.title
            self.title = "untitled"
        end

        self.status = "not started"
    end
end
