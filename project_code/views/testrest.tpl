<html>
<head>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" ></script>
</head>

<body>

<button id="json">json</button>
<p><p>
<div id="sentence">Harry Loves Mary</div>


<script type="text/javascript">
    $('#json').click(function(){
        sentence = ''
         $.getJSON("/singleword",
         function(data) {
            $.each(data.words,function(index,element) {
                sentence = sentence + " " + (element.word);
                });
            console.log(data)
            $('#sentence').html(sentence)

          });
    });

</script>
</body>