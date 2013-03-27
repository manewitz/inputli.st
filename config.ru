require 'newrelic_rpm'
require 'new_relic/agent/instrumentation/rack'

use Rack::Static, 
  urls: %w{/css /images /js /lib},
  root: "public"

run lambda { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
    },
    File.open('public/index.html', File::RDONLY)
  ]
}
