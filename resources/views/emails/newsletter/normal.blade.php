<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{ $data['title'] }}</title>
  <style>
    body {
      background-color: #0f1113;
      color: #ffffff;
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 680px;
      margin: auto;
      padding: 2rem;
      background-color: #131517;
      border: 1px solid #2b2d31;
      border-radius: 8px;
    }
    .title {
      font-size: 28px;
      font-weight: bold;
      color: #00d2ff;
      margin-bottom: 10px;
    }
    .subject {
      font-size: 16px;
      color: #a0a0a0;
      margin-bottom: 20px;
    }
    .content {
      font-size: 14px;
      line-height: 1.7;
      color: #e0e0e0;
      margin-bottom: 30px;
    }
    .highlighted {
      border-left: 4px solid #00ffb3;
      background: #1a1c1f;
      padding: 15px;
      border-radius: 5px;
    }
    .images img {
      width: 100%;
      max-height: 200px;
      object-fit: cover;
      margin-bottom: 15px;
      border-radius: 4px;
      border: 1px solid #333;
    }
    .attachments a {
      display: block;
      color: #00d2ff;
      text-decoration: none;
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  
    {{-- resources/views/emails/newsletter.blade.php --}}
    @if($data['template'] && $data['template'] == 1)
    @include('emails.newsletter.templates.normal1', ['data' => $data])
    @elseif($data['template'] && $data['template'] == 2)
    @include('emails.newsletter.templates.normal2', ['data' => $data])
    @else
    @include('emails.newsletter.templates.normal3', ['data' => $data])
    @endif

</body>
</html>
