class StaticPagesController < ApplicationController
    # don't require login for the home page
    skip_before_action      :require_login,             :only => [:index]
    before_action           :redirect_if_logged_in,     :only => [:index]

    def index
    end

    private
        def redirect_if_logged_in
            if logged_in?
                redirect_to timeline_path
            end
        end
end
