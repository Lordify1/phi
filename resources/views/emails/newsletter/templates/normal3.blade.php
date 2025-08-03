{{-- resources/views/emails/newsletter/templates/normal3.blade.php --}}
{{-- @php
  $images = json_encode($data['images'])
  $attachments = json_encode($data['attachments'])
@endphp --}}
<!DOCTYPE html>
<html lang="en" style="background: #f4f4f4; color: #222;">
  <head>
    <meta charset="UTF-8">
    <title>{{ $data['title'] ?? 'Newsletter' }}</title>
  </head>
  <body style="margin:0; padding:0; background: #f4f4f4; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background: #f4f4f4;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 8px; overflow: hidden; margin: 2rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.07);">
            <!-- Header -->
            <tr>
              <td style="background: #0d0f11; padding: 2rem 2rem 1rem 2rem; text-align: center;">
                <img src="{{ $data['logo'] ?? 'https://placehold.co/120x40?text=Logo' }}" alt="Logo" style="height: 40px; margin-bottom: 1rem;">
                <h2 style="color: #00d2ff; margin: 0;">{{ $data['company'] ?? 'Your Company Name' }}</h2>
              </td>
            </tr>
            <!-- Title & Subject -->
            <tr>
              <td style="padding: 2rem 2rem 1rem 2rem;">
                <h1 style="color: #0d0f11; margin-bottom: 0.5rem;">{{ $data['title'] }}</h1>
                <p style="color: #00d2ff; font-size: 1.1rem; margin-top: 0;">{{ $data['subject'] }}</p>
              </td>
            </tr>
            <!-- Content & Images -->
            <tr>
              <td style="padding: 0 2rem 2rem 2rem;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td valign="top" style="width: 60%; padding-right: 1rem;">
                      <div style="color: #222; font-size: 1rem; line-height: 1.6;">
                        {!! $data['content'] !!}
                      </div>
                    </td>
                    {{-- <td valign="top" style="width: 40%;">
                      @if(!empty($images))
                        @foreach($images as $img)
                          <img src="{{ $img }}" style="width: 100%; border-radius: 8px; margin-bottom: 1rem; box-shadow: 0 1px 4px rgba(0,0,0,0.08);">
                        @endforeach
                      @endif
                      @if(!empty($attachments))
                        <div style="margin-top: 1rem;">
                          <h4 style="color: #a76e3d; margin-bottom: 0.5rem;">Downloads</h4>
                          <ul style="padding-left: 1.2rem; margin: 0;">
                            @foreach($attachments as $file)
                              <li style="margin-bottom: 0.5rem;">
                                <a href="{{ $file }}" style="color: #00d2ff; text-decoration: underline;">Download</a>
                              </li>
                            @endforeach
                          </ul>
                        </div>
                      @endif
                    </td> --}}
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background: #0d0f11; color: #aaa; text-align: center; padding: 1.5rem 2rem;">
                <p style="margin: 0 0 0.5rem 0; font-size: 0.95rem;">
                  &copy; {{ date('Y') }} {{ $data['company'] ?? 'Your Company Name' }}. All rights reserved.
                </p>
                <p style="margin: 0; font-size: 0.95rem;">
                  <a href="{{ $data['unsubscribe_url'] ?? '#' }}" style="color: #00d2ff; text-decoration: underline;">Unsubscribe</a> from this newsletter.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>