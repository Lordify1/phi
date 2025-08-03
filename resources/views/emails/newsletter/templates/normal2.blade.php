{{-- resources/views/emails/templates/newsletter2.blade.php --}}
<html style="background: #0d0f11; color: #fff;">
  <body style="text-align: center; font-family: sans-serif; padding: 3rem;">
    <h1 style="font-size: 3rem; color: #00d2ff;">🚀 {{ $data['title'] }}</h1>
    <p style="font-size: 1.5rem; color: #00ffb3;">{{ $data['subject'] }}</p>

    <div style="margin-top: 2rem; background: #1e1f22; padding: 2rem; border-radius: 10px;">
      <p style="font-size: 1.1rem;">{!! $data['content'] !!}</p>
    </div>

    @if(!empty(json_decode($data['images'])))
      <div style="margin-top: 2rem;">
        @foreach(json_decode($data['images']) as $img)
          <img src="{{ $img }}" style="width: 60%; margin: 1rem auto; display: block; border-radius: 12px;">
        @endforeach
      </div>
    @endif

    @if(!empty(json_decode($data['attachments'])))
      <div style="margin-top: 2rem;">
        <p style="color: #a76e3d;">📎 Files</p>
        @foreach(json_decode($data['attachments']) as $file)
          <a href="{{ $file }}" style="color: #00ffb3; display: block;">Download File</a>
        @endforeach
      </div>
    @endif
  </body>
</html>
