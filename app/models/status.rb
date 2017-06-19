class Status < ApplicationRecord
  belongs_to :user

  has_many :comments, dependent: :destroy
  has_many :replies, dependent: :destroy
  has_many :likes, dependent: :destroy

  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 140 }
end
