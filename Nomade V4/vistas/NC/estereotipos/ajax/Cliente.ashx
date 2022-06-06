<%@ WebHandler Language="VB" Class="Cliente" %>

Imports System
Imports System.Web
Imports System.Data

Public Class Cliente : Implements IHttpHandler
    Dim flag, activo, empresa, fechai, fechat, user, pidm, categoria, usuario As String
    Dim p_Code_Pais, p_Code_Depa, p_Code_Prov, p_Code_Dist, p_Code_Empr As String
    Dim dt As DataTable

    Dim resb As New StringBuilder
    'Instanciamos las clases de Persona
    Dim P As New Nomade.NC.NCECliente("Bn")
    Dim cp As New Nomade.NC.NCSucursalClienteProveedor("Bn")
    Dim res As String
    Dim tipo As String
    Dim depend_code As String
    Dim sgmt As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'Capturamos los valores que nos envia el formulario
        '======================================



        flag = context.Request("flag")


        pidm = context.Request("pidm")
        categoria = context.Request("cate")
        tipo = context.Request("tipo")
        depend_code = context.Request("depend_code")
        activo = context.Request("acti")
        empresa = context.Request("empr")
        usuario=context.Request("usua")
        fechai = Utilities.fechaLocal(context.Request("feci"))
        sgmt = context.Request("sgmt")

        fechat = context.Request("fect")
        If fechat <> String.Empty Then
            fechat = Utilities.fechaLocal(context.Request("fect"))
        End If

        user = context.User.Identity.Name

        context.Response.ContentType = "text/html"
        Try
            Select Case flag
                Case "1"
                    res = CrearCliente(pidm, fechai, fechat, empresa, categoria, activo, user, sgmt)

                Case "2"
                    res = ActualizarCliente(pidm, fechai, fechat, empresa, categoria, activo, user, sgmt)

                Case "3"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    res = GenerarSelect(dt, "slcEmpresaclie", "codigo", "descripcion", "EMPRESA")

                Case "4"
                    Dim p As New Nomade.NC.NCTipoClienteProveedor("BN")
                    dt = p.ListarTipoClienteProveedor(String.Empty, "C", "A", empresa)
                    res = GenerarSelect(dt, "slcTipoclie", "codigo", "descripcion", "TIPO")

                Case "5" 'cargar los datos en formato json

                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = P.ListarCliente(pidm, String.Empty, empresa, "N")
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""EMPRESA"" :" & """" & dt.Rows(0)("EMPRESA") & """,")
                        resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                        resb.Append("""FECHA_TERMINO"" :" & """" & dt.Rows(0)("FECHA_TERMINO") & """,")
                        resb.Append("""FECHA_INICIO"" :" & """" & dt.Rows(0)("FECHA_INICIO") & """,")
                        resb.Append("""SGMT_CODE1"" :" & """" & dt.Rows(0)("SGMT_CODE1") & """,")
                        resb.Append("""SGMT_CODE2"" :" & """" & dt.Rows(0)("SGMT_CODE2") & """,")
                        resb.Append("""SGMT_CODE3"" :" & """" & dt.Rows(0)("SGMT_CODE3") & """,")
                        resb.Append("""CODIGO_CATEGORIA"" :" & """" & dt.Rows(0)("CODIGO_CATEGORIA") & """")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = "[]"
                    End If
                Case "7" ' Lista Datos Resumen de Linea Credito del Cliente
                    Dim ccLineaCredito As New Nomade.CC.CCLineaCredito("Bn")
                    dt = ccLineaCredito.ListarDatosResumenLineaCredito(pidm, empresa)
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

                Case "LINEA_CRED_CLI_FAST" ' Lista Datos Resumen de Linea Credito del Cliente Rapido
                    Dim ccLineaCredito As New Nomade.CC.CCLineaCredito("Bn")
                    dt = ccLineaCredito.ListarDatosResumenLineaCredito(pidm, "FAST" & empresa)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""PLAZO"" :" & """" & dt.Rows(0)("PLAZO") & """,")
                        resb.Append("""LINEA"" :" & """" & dt.Rows(0)("LINEA_MOBA") & """,")
                        resb.Append("""ACTUAL"" :" & """" & dt.Rows(0)("ACTUAL_MOBA") & """,")
                        resb.Append("""ACTUAL_MOAL"" :" & """" & dt.Rows(0)("ACTUAL_MOAL") & """,")
                        resb.Append("""MONTO_VENCIDO"" :" & """" & dt.Rows(0)("MONTO_VENCIDO") & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "RES_LINEA_CRED_CLI" ' Lista Datos Resumen de Linea Credito del Cliente
                    Dim ccLineaCredito As New Nomade.CC.CCLineaCredito("Bn")
                    Dim oDT As New DataTable
                    oDT = ccLineaCredito.fnListarDatosResumenLineaCreditoCorto(empresa, pidm)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If
                Case "8" ' Lista Datos Resumen de las Ventas a un Cliente
                    Dim ccCuentaPorCobrar As New Nomade.CC.CCCuentaPorCobrar("Bn")
                    dt = ccCuentaPorCobrar.ListarDatosResumenVentas(pidm, empresa)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""VENTAS_MES_ANTERIOR"" :" & """" & dt.Rows(0)("VENTAS_MES_ANTERIOR") & """,")
                        resb.Append("""VENTAS_ANIO_ANTERIOR"" :" & """" & dt.Rows(0)("VENTAS_ANIO_ANTERIOR") & """,")
                        resb.Append("""VENTAS_PROM_MENSUAL"" :" & """" & dt.Rows(0)("VENTAS_PROM_MENSUAL") & """,")
                        resb.Append("""VENTAS_ACUMULADO"" :" & """" & dt.Rows(0)("VENTAS_ACUMULADO") & """,")
                        resb.Append("""MESES_TRANSCURRIDOS"" :" & """" & dt.Rows(0)("MESES_TRANSCURRIDOS") & """,")
                        resb.Append("""MONEDA"" :" & """" & dt.Rows(0)("MONEDA") & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If

                    res = resb.ToString()

                Case "9"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = cp.ListarSegmentacionEstablecimiento(tipo, depend_code, empresa)
                    If Not dt Is Nothing Then

                        res = Utilities.Datatable2Json(dt)

                    Else
                        res = "[]"
                    End If

                Case "LISTAR_DEUDAS_CLIENTES" ' Lista Deudas de un Cliente
                    Dim ccCuentaPorCobrar As New Nomade.CC.CCCuentaPorCobrar("Bn")
                    Dim oDT As New DataTable
                    oDT = ccCuentaPorCobrar.ListarCuentasPorCobrar(empresa, pidm)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If



            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public Function CrearCliente(ByVal p_pidm As String, ByVal p_fechai As String, ByVal p_fechat As String, ByVal p_empresa As String, ByVal p_categoria As String, ByVal p_activo As String, ByVal p_user As String, ByVal p_sgmt As String) As String
        Dim datos As String
        datos = P.CrearCliente(p_pidm, p_fechai, p_fechat, p_empresa, p_categoria, p_activo, p_user, p_sgmt)

        Return datos

    End Function




    Public Function ActualizarCliente(ByVal p_pidm As String, ByVal p_fechai As String, ByVal p_fechat As String, ByVal p_empresa As String, ByVal p_categoria As String, ByVal p_activo As String, ByVal p_user As String, ByVal p_sgmt As String) As String
        Dim datos As String
        datos = P.ActualizarCliente(p_pidm, p_fechai, p_fechat, p_empresa, p_categoria, p_activo, p_user, p_sgmt)
        Return datos
    End Function


    'combo para pais, departamento,provincia,distrito
    Public Function GenerarSelect(ByVal dt As DataTable, ByVal id As String, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        res = "<select class=""span12"" id=""" & id & """>"
        res += "<option value=""0""><option>"
        If Not dt Is Nothing Then


            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
            Next

        End If
        res += "</select>"
        Return res
    End Function


    Public Function CambiarEstadoEmpresa(ByVal cod As String) As String
        Dim datos As String
        datos = P.CambiarEstadoCliente(cod)
        Return datos
    End Function



    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property





End Class