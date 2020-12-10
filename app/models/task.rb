class Task < ApplicationRecord
    before_create :preprocess

    def preprocess
        if self.description == ''
            self.description = 'no description'
        end

        if self.title == ''
            self.title = 'untitled'
        end

        self.status = "Not started"
    end
end
