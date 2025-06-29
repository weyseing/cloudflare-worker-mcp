FROM node:24.3.0 

# working dir
WORKDIR /usr/src/app

# terminal settings
RUN echo 'export PS1="\[$(tput bold)\]\[$(tput setaf 6)\]\\t \\d\\n\[$(tput setaf 2)\][\[$(tput setaf 3)\]\u\[$(tput setaf 1)\]@\[$(tput setaf 3)\]\h \[$(tput setaf 6)\]\w\[$(tput setaf 2)\]]\[$(tput setaf 4)\\]\\$ \[$(tput sgr0)\]"' >> /root/.bashrc \
    && echo "alias grep='grep --color=auto'" >> /root/.bashrc

# timezone
RUN ln -snf /usr/share/zoneinfo/Asia/Kuala_Lumpur /etc/localtime && \
    echo Asia/Kuala_Lumpur > /etc/timezone

# install node packages
COPY package*.json ./
RUN npm install

# app files
COPY . .

# entrypoint
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh
CMD ["./docker-entrypoint.sh"]