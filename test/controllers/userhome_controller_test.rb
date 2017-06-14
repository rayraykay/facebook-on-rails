require 'test_helper'

class UserhomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get userhome_index_url
    assert_response :success
  end

end
