FROM php:7.3.30-apache

WORKDIR /NCKU_Trans
RUN docker-php-ext-install pdo_mysql
RUN apt-get update -y && apt-get install -y zip unzip git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --version=1.10.22

ADD composer.* ./
RUN composer install --no-autoloader