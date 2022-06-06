<%@ WebHandler Language="VB" Class="Proveedor" %>

Imports System
Imports System.Web
Imports System.Data

Public Class Proveedor : Implements IHttpHandler
    'Declaramos variables para usarlas en el proceso
    Dim flag, activo, empresa, fechai, fechat, user, pidm, categoria, usuario, nivelcadena, desc As String
    Dim p_Code_Pais, p_Code_Depa, p_Code_Prov, p_Code_Dist, p_Code_Empr As String
    Dim CTLG_CODE As String
    Dim dt As DataTable
    Dim codrec As String
    Dim resb As New StringBuilder
    'Instanciamos las clases de Persona

    Dim res As String
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'Capturamos los valores que nos envia el formulario
        '======================================

        flag = context.Request("flag")

        pidm = context.Request("pidm")
        categoria = context.Request("cate")
        activo = context.Request("acti")
        empresa = context.Request("empr")
        usuario = context.Request("usua")
        nivelcadena = context.Request("nivelcadena")
        desc = context.Request("desc")

        CTLG_CODE = context.Request("CTLG_CODE")

        fechai = Utilities.fechaLocal(context.Request("feci"))

        fechat = context.Request("fect")
        If fechat <> String.Empty Then
            fechat = Utilities.fechaLocal(context.Request("fect"))
        End If

        user = context.Request("user")

        context.Response.ContentType = "text/html"

        Select Case flag
            Case "1"
                res = CrearProveedor(pidm, fechai, fechat, empresa, categoria, activo, user, nivelcadena, desc)

            Case "2"
                res = ActualizarProveedor(pidm, fechai, fechat, empresa, categoria, activo, user, nivelcadena, desc)

            Case "3"
                Dim p As New Nomade.NC.NCEmpresa("BN")
                dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                res = GenerarSelect(dt, "slcEmpresaprov", "codigo", "descripcion")
                p = Nothing
            Case "4"
                Dim c As New Nomade.NR.NRCategoriaProveedor("BN")
                dt = c.ListarTipoClienteProveedor(String.Empty, "P", "A", CTLG_CODE)
                res = GenerarSelect(dt, "slcTipoprov", "CODIGO", "DESCRIPCION")
                c = Nothing
            Case "5"  'cargar los datos en formato json 
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim p As New Nomade.NC.NCEProveedor("Bn")
                dt = p.ListarProveedor(pidm, String.Empty, empresa)
                If dt Is Nothing Then
                    dt = p.ListarProveedor(pidm, String.Empty, empresa, "0006")
                End If
                If Not dt Is Nothing Then
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CTLG_CODE"" :" & """" & dt.Rows(0)("CTLG_CODE") & """,")
                    resb.Append("""CATE_CODE"" :" & """" & dt.Rows(0)("CATE_CODE") & """,")
                    resb.Append("""NICA_CODE"" :" & """" & dt.Rows(0)("NICA_CODE") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                    resb.Append("""FECHA_INICIO"" :" & """" & dt.Rows(0)("FECHA_INICIO") & """,")
                    resb.Append("""FECHA_TERMINO"" :" & """" & dt.Rows(0)("FECHA_TERMINO") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                    resb.Append("}")
                    resb.Append("]")
                End If
                res = resb.ToString()
                p = Nothing

            Case "6"
                Dim n As New Nomade.NR.NRNivelCadenaAbastecimiento("BN")
                dt = n.ListarNivelCadenaAbastecimiento(String.Empty, "A")
                res = GenerarSelect(dt, "slcNivelCadenaAbastecimiento", "CODIGO", "DESCRIPCION")
                n = Nothing
            Case "7"
                Dim cpLineaCredito As New Nomade.CP.CPLineaCredito("Bn")
                dt = cpLineaCredito.ListarDatosResumenLineaCredito(pidm, empresa)
                If Not dt Is Nothing Then
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CREDITO"" :" & """" & dt.Rows(0)("CREDITO") & """,")
                    resb.Append("""PLAZO"" :" & """" & dt.Rows(0)("PLAZO") & """,")
                    resb.Append("""LINEA"" :" & """" & dt.Rows(0)("LINEA_MOBA") & """,")
                    resb.Append("""LINEA_MOAL"" :" & """" & dt.Rows(0)("LINEA_MOAL") & """,")
                    resb.Append("""USADO"" :" & """" & dt.Rows(0)("USADO_MOBA") & """,")
                    resb.Append("""USADO_MOAL"" :" & """" & dt.Rows(0)("USADO_MOAL") & """,")
                    resb.Append("""ACTUAL"" :" & """" & dt.Rows(0)("ACTUAL_MOBA") & """,")
                    resb.Append("""ACTUAL_MOAL"" :" & """" & dt.Rows(0)("ACTUAL_MOAL") & """,")
                    resb.Append("""NRO_COMPRAS"" :" & """" & dt.Rows(0)("NRO_COMPRAS") & """,")
                    resb.Append("""ULTIMA_FECHA"" :" & """" & dt.Rows(0)("ULTIMA_FECHA") & """,")
                    resb.Append("""TIEMPO_VENCIDO"" :" & """" & dt.Rows(0)("TIEMPO_VENCIDO") & """,")
                    resb.Append("""MONTO_VENCIDO"" :" & """" & dt.Rows(0)("MONTO_VENCIDO") & """,")
                    resb.Append("""MONTO_CONTRAENTREGA"" :" & """" & dt.Rows(0)("MONTO_CONTRAENTREGA") & """,")
                    resb.Append("""MONEDA"" :" & """" & dt.Rows(0)("MONEDA") & """")
                    resb.Append("}")
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "8"
                Dim cpCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
                dt = cpCuentaPorPagar.ListarDatosResumenCompras(pidm, empresa)
                If Not dt Is Nothing Then
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""COMPRAS_MES_ANTERIOR"" :" & """" & dt.Rows(0)("COMPRAS_MES_ANTERIOR") & """,")
                    resb.Append("""COMPRAS_ANIO_ANTERIOR"" :" & """" & dt.Rows(0)("COMPRAS_ANIO_ANTERIOR") & """,")
                    resb.Append("""COMPRAS_PROM_MENSUAL"" :" & """" & dt.Rows(0)("COMPRAS_PROM_MENSUAL") & """,")
                    resb.Append("""COMPRAS_ACUMULADO"" :" & """" & dt.Rows(0)("COMPRAS_ACUMULADO") & """,")
                    resb.Append("""MESES_TRANSCURRIDOS"" :" & """" & dt.Rows(0)("MESES_TRANSCURRIDOS") & """,")
                    resb.Append("""MONEDA"" :" & """" & dt.Rows(0)("MONEDA") & """")
                    resb.Append("}")
                    resb.Append("]")
                End If
                res = resb.ToString()

        End Select

        context.Response.Write(res)

    End Sub

    Public Function CrearProveedor(ByVal p_pidm As String, ByVal p_fechai As String, ByVal p_fechat As String, ByVal p_empresa As String, ByVal p_categoria As String, ByVal p_activo As String, ByVal p_user As String, ByVal p_nivelcadena As String, ByVal p_desc As String) As String
        Dim datos As String
        Dim p As New NOMADE.NC.NCEProveedor("Bn")
        datos = p.CrearProveedor(p_pidm, p_fechai, p_fechat, p_empresa, p_categoria, p_activo, p_user, p_nivelcadena, p_desc)
        p = Nothing
        Return datos

    End Function

    Public Function ActualizarProveedor(ByVal p_pidm As String, ByVal p_fechai As String, ByVal p_fechat As String, ByVal p_empresa As String, ByVal p_categoria As String, ByVal p_activo As String, ByVal p_user As String, ByVal p_nivelcadena As String, ByVal p_desc As String) As String
        Dim datos As String
        Dim p As New NOMADE.NC.NCEProveedor("Bn")
        datos = p.ActualizarProveedor(p_pidm, p_fechai, p_fechat, p_empresa, p_categoria, p_activo, p_user, nivelcadena, p_desc)
        p = Nothing
        Return datos
    End Function

    'combo para pais, departamento,provincia,distrito
    Public Function GenerarSelect(ByVal dt As DataTable, ByVal id As String, ByVal cvalue As String, ByVal chtml As String) As String
        If Not dt Is Nothing Then
            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
            Next
        Else
            res = "<option></option>"
        End If
        Return res
        'If Not dt Is Nothing Then
        '    res = "<select class=""span12"" id=""" & id & """>"
        '    res += "<option value=""0""><option>"
        '    For i As Integer = 0 To dt.Rows.Count - 1
        '        res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
        '    Next
        '    res += "</select>"
        'Else
        '    res = "error"
        'End If
        'Return res
    End Function

    Public Function CambiarEstadoEmpresa(ByVal cod As String) As String
        Dim datos As String
        Dim p As New NOMADE.NC.NCEProveedor("Bn")
        datos = p.CambiarEstadoProveedor(cod)
        p = Nothing
        Return datos
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class