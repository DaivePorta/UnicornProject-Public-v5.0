<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Impresion.aspx.vb" Inherits="vistas_TP_Impresion" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    

    <link href="../../recursos/plugins/data-tables/css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../../recursos/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../../recursos/plugins/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css" />
    <link href="css/TomaPedidos.css" rel="stylesheet" type="text/css" />
    <link href="../../recursos/css/style-metro.css" rel="stylesheet" />
    <link href="../../recursos/plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="../../recursos/plugins/font-awesome/css1/font-awesome.css" rel="stylesheet" />
    <link href="../../recursos/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.css" rel="stylesheet" />

    <script src="../../recursos/plugins/jquery-1.8.3.min.js" type="text/javascript"></script>
    <script src="../../recursos/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>
    <script src="../../recursos/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>

    <script type="text/javascript" src="../../recursos/plugins/data-tables/js/jquery.dataTables.js"></script>
    <script src="../../recursos/plugins/jquery.blockui.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../recursos/plugins/gritter/js/jquery.gritter.js"></script>
    <script src="../../recursos/scripts/UTILES.js" type="text/javascript"></script>

    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
        </div>
    </form>

            
    <script src="js/ImpresionPV.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function () {
            impresion.init();
        });
    </script>

</body>
</html>
