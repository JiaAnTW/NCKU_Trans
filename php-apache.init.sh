#!/bin/sh

sleep 10s

if [ -d "/NCKU_Trans/app" ]
  then php artisan serve --host=0.0.0.0
  return
fi

mkdir tmp
git clone -b docker https://github.com/vacantron/NCKU_Trans.git /NCKU_Trans/tmp
cp -af /NCKU_Trans/tmp/. /NCKU_Trans/
rm .env.example
rm -rf /NCKU_Trans/tmp
composer dump-autoload

php artisan make:middleware Cors
sed -i "18s/.*/        return \$next(\$request)/" ./app/Http/Middleware/Cors.php
sed -i "19s/.*/                ->header(\'Access-Control-Allow-Origin\', \'*\')\n/" ./app/Http/Middleware/Cors.php
sed -i "20s/.*/                ->header(\'Access-Control-Allow-Headers\', \'*\')\n/" ./app/Http/Middleware/Cors.php
sed -i "21s/.*/                ->header(\'Access-Control-Allow-Methods\', \'*\');\n    }/" ./app/Http/Middleware/Cors.php

sed -i "22s/.*/        \\\App\\\Http\\\Middleware\\\Cors::class,\n    \];/" ./app/Http/Kernel.php

composer dump-autoload
php artisan config:clear
php artisan config:cache
php artisan migrate
php artisan db:seed
php artisan key:generate
php artisan serve --host=0.0.0.0
