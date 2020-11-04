#!/bin/sh

export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
npm run tsc

# https://stackoverflow.com/questions/41965415/using-find-to-return-filenames-without-extension
find ./miniprogram -name "*.less" -exec sh -c 'printf "%s\n" "${0%.*}"' {} ';' | while IFS= read -r -d $'\n' file;
  do lessc $file.less $file.wxss
done


