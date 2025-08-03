{{-- resources/views/emails/templates/newsletter1.blade.php --}}
<html style="background: #0d0f11; color: #ffffff;">
  <body style="font-family: sans-serif; padding: 2rem;">
    <h1 style="color: #00d2ff;">{{ $data['title'] }}</h1>
    <h2 style="color: #00ffb3;">{{ $data['subject'] }}</h2>
    <p style="margin-top: 1.5rem;"> {!! $data['content'] !!} </p>

    @if(!empty($data['images']))
      <div style="margin-top: 2rem;">
        @foreach($data['images'] as $img)
          <img src="{{ $img }}" alt="Newsletter Image" style="width: 100%; margin-top: 1rem; border-radius: 10px;">
        @endforeach
      </div>
    @endif

    @if(!empty($data['attachments']))
      <div style="margin-top: 2rem;">
        <h4 style="color: #a76e3d;">Attachments</h4>
        <ul>
          @foreach($data['attachments'] as $file)
            <li><a href="{{ $file }}" style="color: #00ffb3;">Download</a></li>
          @endforeach
        </ul>
      </div>
    @endif
  </body>
</html>