FROM node:lts as dependencies
WORKDIR /hse-timetracker
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM node:lts as builder
WORKDIR /hse-timetracker
COPY . .
COPY --from=dependencies /hse-timetracker/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /hse-timetracker
ENV NODE_ENV production

COPY --from=builder /hse-timetracker/public ./public
COPY --from=builder /hse-timetracker/package.json ./package.json
COPY --from=builder /hse-timetracker/.next ./.next
COPY --from=builder /hse-timetracker/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]