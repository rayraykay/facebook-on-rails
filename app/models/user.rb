class User < ApplicationRecord
    # has to have a name, using validates method
    validates :username, presence: true, length: { maximum: 75 }

    # has to have a secure password
    has_secure_password
    validates :password, presence: true

    # contains many statuses
end
