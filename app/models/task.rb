class Task < ApplicationRecord
    before_create :preprocess

    def preprocess
        if self.description == '' || !self.description
            self.description = "no description"
        end

        if self.title == '' || !self.title
            self.title = "untitled"
        end

        # if self.due_date
        #     if self.due_date >= Date.today
        #         self.status = "expired"
        #     else
        #         self.status = "not started"
        #     end
        # else
        #     self.status = "not started"
        # end
        self.status = "not started"
    end
end
