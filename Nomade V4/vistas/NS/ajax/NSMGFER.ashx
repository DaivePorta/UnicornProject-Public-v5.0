<%@ WebHandler Language="VB" Class="NSMGFER" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NSMGFER : Implements IHttpHandler


    Dim OPCION As String
    Dim dt, dt2 As DataTable
    Dim CODE_FER As String
    Dim DEV As String
    Dim DESC, FECHA, REPETIR_IND, TIEMPO_IND, HORA_INICIO, HORA_FIN, ESTADO_IND, USUA_ID, CODE, EMPRESA, ESTABLECIMIENTO As String
    Dim codrec As String
    Dim t As New Nomade.NS.NSGestion_de_feriado("Bn")
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        codrec = context.Request.QueryString("codigo")

        OPCION = context.Request("OPCION")
        CODE_FER = context.Request("CODE_FER")
        DESC = context.Request("DESC")
        FECHA = Utilities.fechaLocal(context.Request("FECHA"))
        REPETIR_IND = context.Request("REPETIR_IND")
        TIEMPO_IND = context.Request("TIEMPO_IND")
        HORA_INICIO = context.Request("HORA_INICIO")
        HORA_FIN = context.Request("HORA_FIN")
        ESTADO_IND = context.Request("ESTADO_IND")
        USUA_ID = context.Request("USUA_ID")
        CODE = context.Request("CODE")
        EMPRESA = context.Request("EMPRESA")
        ESTABLECIMIENTO = context.Request("ESTABLECIMIENTO")
        context.Response.ContentType = "text/html"

        If codrec <> String.Empty Then
            OPCION = "RESUL"
        End If


        Try
            Select Case OPCION.ToString

                Case "R"
                    DEV = t.CambiarEstadoFeriados(CODE_FER)
                Case "CR"
                    DEV = t.CrearFeriados(DESC, FECHA, REPETIR_IND, TIEMPO_IND, HORA_INICIO, HORA_FIN, ESTADO_IND, USUA_ID)

                Case "AC"
                    DEV = t.ActualizarFeriados(CODE, DESC, FECHA, REPETIR_IND, TIEMPO_IND, HORA_INICIO, HORA_FIN, ESTADO_IND, USUA_ID)

                Case "EM"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    DEV = GenerarSelect(dt, "cboEmpresa", "codigo", "descripcion", "EMPRESA")

                Case "ES"
                    Dim p As New Nomade.NC.NCSucursal("BN")
                    If EMPRESA = "T" Then
                        EMPRESA = ""
                    End If
                    'dt = p.ListarSucursal(EMPRESA, String.Empty, "A")
                    dt = p.ListarSucursalFeriado(EMPRESA, "A", USUA_ID)
                    DEV = GenerarSelect(dt, "cboEstablecimiento", "codigo", "descripcion", "ESTABLECIMIENTO")

                Case "DE"

                    If EMPRESA = "T" Then
                        EMPRESA = ""
                    End If

                    If ESTABLECIMIENTO = "T" Then
                        ESTABLECIMIENTO = ""
                    End If
                    DEV = t.EditarDetalleFeriados(CODE, ESTABLECIMIENTO, ESTADO_IND, USUA_ID, EMPRESA)
                    If DEV.Contains("EXISTE") Then
                        DEV = "ADVERTENCIA: " & DEV
                    Else
                        dt = t.ListarFeriadosDetalle(CODE, "A", String.Empty)
                        DEV = GenerarLista(dt, "CODE_ESTABLECIMIENTO", "ESTABLECIMIENTO", "LESTABLECIMIENTO")
                    End If

                Case "DL"
                    dt = t.ListarFeriadosDetalle(CODE, "A", String.Empty)
                    DEV = GenerarLista(dt, "CODE_ESTABLECIMIENTO", "ESTABLECIMIENTO", "LESTABLECIMIENTO")

                Case "L"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = t.ListarFeriadosDetalle(CODE, "A", String.Empty)
                    DEV = ListadoDetalle(dt)

                Case Else

                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = t.ListarFeriados(codrec, String.Empty, String.Empty)


                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODE"" :" & """" & dt.Rows(0)("CODE") & """,")
                    resb.Append("""NDESC"" :" & """" & dt.Rows(0)("NDESC") & """,")
                    resb.Append("""FECHA"" :" & """" & dt.Rows(0)("FECHA") & """,")
                    resb.Append("""REPETIR_IND"" :" & """" & dt.Rows(0)("REPETIR_IND") & """,")
                    resb.Append("""TIEMPO_IND"" :" & """" & dt.Rows(0)("TIEMPO_IND") & """,")
                    resb.Append("""NTIEMPO_IND"" :" & """" & dt.Rows(0)("NTIEMPO_IND") & """,")
                    resb.Append("""HORA_INICIO"" :" & """" & dt.Rows(0)("HORA_INICIO") & """,")
                    resb.Append("""HORA_FIN"" :" & """" & dt.Rows(0)("HORA_FIN") & """,")
                    resb.Append("""ESTADO_IND"" :" & """" & dt.Rows(0)("ESTADO_IND") & """,")
                    resb.Append("""NESTADO_IND"" :" & """" & dt.Rows(0)("NESTADO_IND") & """")
                    resb.Append("}")
                    resb.Append("]")
                    DEV = resb.ToString()

            End Select
            context.Response.Write(DEV)

        Catch ex As Exception
            context.Response.Write("error: " & ex.ToString)
        End Try

    End Sub

    Public Function GenerarSelect(ByVal dt As DataTable, ByVal id As String, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        Dim res As String
        res = "<select class=""span12"" id=""" & id & """>"

        If Not dt Is Nothing Then
            res += "<option></option>"
            res += "<option value=""T"">--TOD" & clase.Substring(clase.Length - 1) & "S L" & clase.Substring(clase.Length - 1) & "S " & clase & "S--</option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
            Next

        Else
            res += "<option>SIN " & clase & "S</option>"
        End If
        res += "</select>"
        Return res
    End Function

    Public Function GenerarLista(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        Dim res As String
        res = ""

        If Not dt Is Nothing Then

            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<p class=""item"" codigo=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</p>"
            Next

        Else
            res += "<p class=""item"" style=""color:#C3C1C1;"">NINGUN ESTABLECIMIENTO...</p>"
        End If

        Return res
    End Function
    Public Function ListadoDetalle(ByVal dt As DataTable) As String
        Dim res As String
        res = ""


        If Not (dt Is Nothing) Then
            res = "["
            For Each MiDataRow As DataRow In dt.Rows
                res = res & "{"
                res = res & """CODIGO"" :" & """" & MiDataRow("CODE_ESTABLECIMIENTO").ToString & ""","
                res = res & """FERIADO"" :" & """" & MiDataRow("FERIADO").ToString & ""","
                res = res & """CATALOGO"" :" & """" & MiDataRow("CATALOGO").ToString & ""","
                res = res & """ESTABLECIMIENTO"" :" & """" & MiDataRow("ESTABLECIMIENTO").ToString & ""","
                res = res & """SCSL_CODE"" :" & """" & MiDataRow("CODE_ESTABLECIMIENTO").ToString & ""","
                res = res & """CTLG_CODE"" :" & """" & MiDataRow("CATALOGO_CODE").ToString & ""","
                res = res & """PEVFERD_ESTADO_IND"" :" & """" & MiDataRow("PEVFERD_ESTADO_IND").ToString & """"
                res = res & "}"
                res = res & ","
            Next
            res = res & "{}"
            res = res.Replace(",{}", String.Empty)
            res = res & "]"
        End If

        Return res
    End Function



    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class