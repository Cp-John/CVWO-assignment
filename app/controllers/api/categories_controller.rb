module Api
    class CategoriesController < ApplicationController
        protect_from_forgery with: :null_session

        def index
            categories = Category.all

            render json: CategorySerializer.new(categories).serialized_json
        end

        def show
            category = Category.find_by(id: params[:id])

            render json: CategorySerializer.new(category).serialized_json
        end

        private def category_params
            params.require(:category).permit(:title)
        end

        def create
            category = Category.new(category_params)
            if category.save
                render json: CategorySerializer.new(category).serialized_json
            else
                render json: { error: category.errors.messages }, status: 422
            end
        end

        def destroy
            category = Category.find_by(id: params[:id])

            if category.destroy
                head :no_content
            else
                render json: { error: category.error.messages }, status: 422
            end
        end

    end
end