<!DOCTYPE html>
<html>
<head>
    <title>Helloooooo Wooooorld</title>
</head>
<body>
Welcome {{username}}
<ul>
%for item in things:
<li>{{item}}</li>
%end
</ul>
<p>
<form action="/favorite_things" method=POST>
What is your favorite thing?
<input type="text" name="most_favorite_thing" size=40 value=""><br>
<input type="text" name="least_favorite_thing" size=40 value=""><br>
<input type="submit" value="submit">
</form>

</body>
</html>