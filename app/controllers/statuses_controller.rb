class StatusesController < ApplicationController
    def index
        respond_with Status.all if request.xhr?
    end

    def create
        respond_with Status.create(status_params)
    end

    private
        def status_params
            params.require(:status).permit(:id, :content, :user_id)
        end
end
