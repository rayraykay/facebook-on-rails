class StatusesController < ApplicationController
    def index
    end

    def create
        Status.create(status_params) if request.xhr?
    end

    private
        def status_params
            params.require(:status).permit(:id, :content, :user_id)
        end
end
