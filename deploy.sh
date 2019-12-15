mkdir -p docs
rm -rf docs/*
cp -pr dist/* docs/
cp CNAME docs/
git add docs/*
git commit -m 'Update'
git push