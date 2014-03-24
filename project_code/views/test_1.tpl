<!DOCTYPE html>
<html>
<head>
    <title>Your Favorite Things</title>
</head>
<body>
Welcome {{username}}

%for item in things:
<li>{{item}}</li>
%end

</body>
</html>