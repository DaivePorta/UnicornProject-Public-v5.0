<%@ WebHandler Language="VB" Class="NRMLETR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NRMLETR : Implements IHttpHandler

    Dim res As String
    Dim flag As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim codigo As String
    Dim glosa As String
    Dim moneda As String
    Dim empresa As String
    Dim tipo As String
    Dim numero As String
    Dim refgirador As String
    Dim lugar As String
    Dim fechagiro As String
    Dim fechavcto As String
    Dim monto As String
    Dim girador As String
    Dim giradoa As String
    Dim avalista As String
    Dim banco As String
    Dim oficina As String
    Dim dc As String
    Dim numerocta As String
    Dim importe As String
    Dim estado As String
    Dim usuario As String
    Dim destino As String
    Dim firmante As String
    Dim numero_unico, sucursal As String

    Private sJSONListaLetras As String

    Private oTransaction As New Nomade.DataAccess.Transaccion()

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            context.Response.ContentType = "text/plain"

            flag = context.Request("flag")
            codigo = context.Request("codigo")
            empresa = context.Request("empresa")
            tipo = context.Request("tipo")
            numero = context.Request("numero")
            refgirador = context.Request("refgirador")
            sucursal = context.Request("sucursal")
            lugar = context.Request("lugar")
            fechagiro = context.Request("fechagiro")
            If fechagiro <> String.Empty Then
                fechagiro = Utilities.fechaLocal(context.Request("fechagiro"))
            End If
            fechavcto = context.Request("fechavcto")
            If fechavcto <> String.Empty Then
                fechavcto = Utilities.fechaLocal(context.Request("fechavcto"))
            End If
            monto = context.Request("monto")
            girador = context.Request("girador")
            giradoa = context.Request("giradoa")
            avalista = context.Request("avalista")
            banco = context.Request("banco")
            oficina = context.Request("oficina")
            dc = context.Request("dc")
            numerocta = context.Request("numerocta")
            importe = context.Request("importe")
            estado = context.Request("estado")
            usuario = context.Request("usuario")
            destino = context.Request("destino")
            firmante = context.Request("firmante")
            moneda = context.Request("moneda")
            glosa = context.Request("glosa")
            numero_unico = context.Request("nunico")

            sJSONListaLetras = context.Request("sJSONListaLetras")

            Select Case flag

                Case "LISTAR"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.GL.GLLetras("BN")
                    dt = p.ListarLetra(String.Empty, String.Empty, tipo, String.Empty, empresa, String.Empty, String.Empty, String.Empty, String.Empty, Utilities.fechaLocal(String.Empty), Utilities.fechaLocal(String.Empty))

                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

                Case "1"
                    Dim p As New Nomade.GL.GLLetras("BN")
                    res = p.CrearLetra(empresa, sucursal, tipo, numero, refgirador, lugar, fechagiro, fechavcto, monto, girador, giradoa, "A", avalista, banco, oficina, dc, numerocta, importe, estado, usuario, destino, firmante, moneda, glosa, numero_unico)

                Case "2"
                    Dim p As New Nomade.GL.GLLetras("BN")
                    res = p.ActualizarLetra(codigo, empresa, tipo, numero, refgirador, lugar, fechagiro, fechavcto, monto, girador, giradoa, "A", avalista, banco, oficina, dc, numerocta, importe, estado, usuario, destino, firmante, moneda, glosa, numero_unico, "S")

                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.GL.GLLetras("BN")
                    'dt = p.ListarLetra(String.Empty, "A", tipo, estLetra, empresa, String.Empty, String.Empty, String.Empty, girador, Utilities.fechaLocal(String.Empty), Utilities.fechaLocal(String.Empty))

                    dt = p.ListarLetra(codigo, "A", tipo, String.Empty, String.Empty, String.Empty, String.Empty, String.Empty, String.Empty, Utilities.fechaLocal(String.Empty), Utilities.fechaLocal(String.Empty))
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""TIPO"" :" & """" & dt.Rows(0)("TIPO") & """,")
                    resb.Append("""NUMERO"" :" & """" & dt.Rows(0)("NUMERO") & """,")
                    resb.Append("""REF_GIRADOR"" :" & """" & dt.Rows(0)("REF_GIRADOR") & """,")
                    resb.Append("""LUGAR"" :" & """" & dt.Rows(0)("LUGAR") & """,")
                    resb.Append("""FECHA_GIRO"" :" & """" & dt.Rows(0)("FECHA_GIRO") & """,")
                    resb.Append("""FECHA_VENC"" :" & """" & dt.Rows(0)("FECHA_VENC") & """,")
                    resb.Append("""MONTO"" :" & """" & dt.Rows(0)("MONTO") & """,")
                    resb.Append("""GIRADOR"" :" & """" & dt.Rows(0)("GIRADOR") & """,")
                    resb.Append("""GIRADOA"" :" & """" & dt.Rows(0)("GIRADOA") & """,")
                    resb.Append("""AVALISTA"" :" & """" & dt.Rows(0)("AVALISTA") & """,")
                    resb.Append("""NGIRADOR"" :" & """" & dt.Rows(0)("NGIRADOR") & """,")
                    resb.Append("""NGIRADOA"" :" & """" & dt.Rows(0)("NGIRADOA") & """,")
                    resb.Append("""NAVALISTA"" :" & """" & dt.Rows(0)("NAVALISTA") & """,")
                    resb.Append("""BANCO_CODE"" :" & """" & dt.Rows(0)("BANCO_CODE") & """,")
                    resb.Append("""OFICINA"" :" & """" & dt.Rows(0)("OFICINA") & """,")
                    resb.Append("""NUMERO_CTA"" :" & """" & dt.Rows(0)("NUMERO_CTA") & """,")
                    resb.Append("""DC"" :" & """" & dt.Rows(0)("DC") & """,")
                    resb.Append("""IMPORTE"" :" & """" & dt.Rows(0)("IMPORTE") & """,")
                    resb.Append("""ESTADO_LETRA"" :" & """" & dt.Rows(0)("ESTADO_LETRA") & """,")
                    resb.Append("""EMPRESA"" :" & """" & dt.Rows(0)("EMPRESA") & """,")
                    resb.Append("""DESTINO"" :" & """" & dt.Rows(0)("DESTINO") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                    resb.Append("""FIRMANTE"" :" & """" & dt.Rows(0)("FIRMANTE") & """,")
                    resb.Append("""GLOSA"" :" & """" & dt.Rows(0)("GLOSA") & """,")
                    resb.Append("""MONEDA"" :" & """" & dt.Rows(0)("MONEDA") & """,")
                    resb.Append("""NUNICO"" :" & """" & dt.Rows(0)("NUNICO") & """,")
                    resb.Append("""NFIRMANTE"" :" & """" & dt.Rows(0)("NFIRMANTE") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "LLC"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.GL.GLLetras("BN")
                    Dim oDT As New DataTable
                    oDT = p.fnListarLetraCorto(codigo)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                Case "4"
                    Dim p As New Nomade.GL.GLLetras("BN")
                    dt = p.ListarLetra("", "A", "", "", empresa, "", "", numero)
                    If Not (dt Is Nothing) Then
                        res = "EXISTE"
                    Else
                        res = "NO EXISTE"
                    End If

                Case "5"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "codigo", "descripcion", "EMPRESA")
                    End If

                Case "6"
                    Dim p As New Nomade.NC.NCBanco("BN")
                    dt = p.ListarBanco(String.Empty, "A")
                    res = GenerarSelect(dt, "banco", "nombre_comercial", "BANCO")

                Case "7"
                    Dim p As New Nomade.GL.GLLetras("Bn")
                    dt = p.ListarMoneda(empresa)
                    res = GenerarSelect(dt, "codigo", "descripcion", "MONEDA")

                Case "8"
                    Dim p As New Nomade.NC.NCCuentaBancaria("Bn")
                    dt = p.ListarCuentasBancarias(empresa, String.Empty, "A", moneda, banco)
                    res = GenerarSelect(dt, "code", "descripcion", "CUENTA")

                Case "9"
                    Dim p As New Nomade.NS.NSUsuario("Bn")
                    dt = p.DevuelveDatosUsuario(usuario)
                    res = dt.Rows(0)("PIDM").ToString()


                Case "L"
                    Dim q As New Nomade.NC.NCPersona("Bn")
                    dt = q.listar_Persona("S")

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()


                Case "LN" ' PERSONAS NATURALES
                    Dim q As New Nomade.NC.NCPersona("Bn")
                    dt = q.fListarPersonaNatural()

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("APELL_PATE").ToString & " " & MiDataRow("APELL_MATE").ToString & " " & MiDataRow("NOMBRE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "LE" 'EMPLEADOS
                    Dim q As New Nomade.NC.NCEEmpleado("Bn")
                    dt = q.Listar_Empleados(0, 0, "A", empresa)

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

            End Select

            context.Response.Write(res)

        Catch ex As Exception
            If oTransaction.iTransactionState = NOMADE.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If
            Dim sMsjeError As String = ex.Message
            If (sMsjeError.IndexOf("[Advertencia]") > -1) Then
                context.Response.Write(sMsjeError)
            Else
                context.Response.Write("[Error]: " + sMsjeError)
            End If
        End Try

    End Sub

    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then

            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If clase = "EMPRESA" Then
                    res += "<option pidm=""" & dt.Rows(i)("PIDM").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Else
                    res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                End If
            Next
        Else
            res = "error"
        End If
        Return res
    End Function


    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class