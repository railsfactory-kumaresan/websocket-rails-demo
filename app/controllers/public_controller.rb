class PublicController < ApplicationController
 def index 
   @posts = Post.all
 end 
end