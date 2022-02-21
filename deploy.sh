yarn build
cd dist
git init
git remote add origin git@github.com:BYK0911/byk0911.github.io.git
git add .
git commit -m 'init'
git push -u origin master -f
