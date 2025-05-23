import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { google } from 'npm:googleapis@133.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { platform } = await req.json()

    if (platform === 'youtube') {
      const youtube = google.youtube('v3')
      const response = await youtube.playlistItems.list({
        key: Deno.env.get('YOUTUBE_API_KEY'),
        part: ['snippet'],
        playlistId: Deno.env.get('YOUTUBE_PLAYLIST_ID'),
        maxResults: 12
      })

      const videos = response.data.items.map(item => ({
        type: 'video',
        src: `https://img.youtube.com/vi/${item.snippet.resourceId.videoId}/maxresdefault.jpg`,
        title: item.snippet.title,
        date: new Date(item.snippet.publishedAt).toLocaleDateString(),
        description: item.snippet.description,
        videoId: item.snippet.resourceId.videoId
      }))

      return new Response(
        JSON.stringify(videos),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (platform === 'instagram') {
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${Deno.env.get('INSTAGRAM_ACCESS_TOKEN')}`
      )
      const data = await response.json()

      const posts = data.data.map(post => ({
        type: post.media_type.toLowerCase() === 'video' ? 'video' : 'image',
        src: post.media_url,
        title: post.caption || 'Instagram Post',
        date: new Date(post.timestamp).toLocaleDateString(),
        link: post.permalink
      }))

      return new Response(
        JSON.stringify(posts),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid platform specified' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})