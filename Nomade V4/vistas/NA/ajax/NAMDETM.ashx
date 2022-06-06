<%@ WebHandler Language="VB" Class="NAMDETM" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NAMDETM : Implements IHttpHandler

    Dim code As String
    Dim opcion As String
    Dim p_ALMACEN, p_GRUP_CODE, p_SCSL_CODE, p_UNME_DET, p_TIPO, p_mone_code As String

    Dim CODIGO, EMPRESA, ALMACEN, DESCRIPCION,
   TIPO_ALMACEN,
   TIPO_ALMACENAJE, ESTADO, USUARIO, SISTEMA_ALMACENAJE, PALETIZADO_IND, NRO_PALETS As String

    Dim p_CTLG_CODE As String

    Dim total As Decimal
    Dim dt As DataTable
    Dim dtp As DataTable
    Dim p As New Nomade.NA.NASeccionesAlmacen("bn")
    Dim gPro As New Nomade.NM.NMGestionProductos("BN")
    Dim res As String
    Dim resb As New StringBuilder

    Dim codempr As String
    Dim usua As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest


        opcion = context.Request("OPCION")

        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_ALMACEN = context.Request("p_alamcen")
        p_GRUP_CODE = context.Request("p_grupo")


        codempr = context.Request("codempr")
        usua = context.Request("usua")

        Try

            Select Case opcion

                Case "1"
                    'res = p.CrearSeccionAlmacen(CODIGO, EMPRESA, ALMACEN, DESCRIPCION, TIPO_ALMACEN, TIPO_ALMACENAJE, ESTADO, USUARIO, SISTEMA_ALMACENAJE, PALETIZADO_IND, NRO_PALETS)
                    Dim p As New Nomade.NA.NAConfAlmacenes("BN")


                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarAlmacenes(String.Empty, codempr, String.Empty, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")

                    Else
                        Dim msg = "Error"
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""MENSAJE"" :" & """" & msg.ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "2"
                    dtp = gPro.ListarProductoDetalladoStock(p_CTLG_CODE, p_ALMACEN, p_GRUP_CODE)
                    If dtp Is Nothing Then
                        GenerarTablaProSinDatos()
                    Else
                        If dtp.Rows.Count = 0 Then
                            GenerarTablaProSinDatos()
                        Else
                            GenerarTablaPro(dtp)
                        End If
                    End If

                Case "3"
                    Dim g As New Nomade.NC.NCGrupos("Bn")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = g.ListarGrupos_X_CTLG(String.Empty, codempr, String.Empty)

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")

                    Else
                        Dim msg = "Error"
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""MENSAJE"" :" & """" & msg.ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If


                    res = resb.ToString()

            End Select

            context.Response.Write(res)

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)
            '<a class="toggle-vis" data-column="0" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
            '<a class="toggle-vis" data-column="1" href="#">DESCRIPCION</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
        End Try
    End Sub


    Public Function GenerarTablaPro(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr align=""center"">"
            res += "<th>CODIGO</th>"
            res += "<th>DESCRIPCION</th>"
            res += "<th>SERIE</th>"
            res += "<th>CANTIDAD</th>"
            res += "<th>FECHA COMPRA</th>"
            res += "<th>COSTO SOLES</th>"
            res += "<th>COSTO DOLARES</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            Dim contador As Integer = 0
            Dim codigorep As String = ""
            For i As Integer = 0 To dt.Rows.Count - 1
                'If Double.Parse(dt.Rows(i)("CANTIDAD_BASE").ToString) > 0.0 Then
                Try

                    If dt.Rows(i)("TIPO_PRODUCTO").ToString().Equals("SIN_SERIE") Then
                        res += "<tr style=""BACKGROUND-COLOR: rgb(223, 223, 223) !important;"">"
                        res += "<td style=""text-align: center"">" & dt.Rows(i)("CODIGO_PRODUCTO").ToString() & "</td>"
                        res += "<td style=""text-align: left"">" & dt.Rows(i)("NOMBRE_PRODUCTO").ToString().ToUpper() & "</td>"
                        res += "<td style=""text-align: center"">" & dt.Rows(i)("SERIE").ToString() & "</td>"
                        res += "<td style=""text-align: center"">" & dt.Rows(i)("CANTIDAD").ToString() & "</td>"
                        res += "<td style=""text-align: center"">" & dt.Rows(i)("FECHA_COMPRA").ToString() & "</td>"
                        res += "<td style=""text-align: center"">" & dt.Rows(i)("PRECIO_COSTO_SOLES").ToString() & "</td>"
                        res += "<td style=""text-align: center"">" & dt.Rows(i)("PRECIO_COSTO_DOLARES").ToString() & "</td>"
                        res += "</tr>"
                        contador = 0
                        codigorep = ""
                        'cantidad = "1"
                    Else
                        If codigorep.Equals(dt.Rows(i)("CODIGO_PRODUCTO").ToString()) Then
                            contador += 1
                        Else
                            contador = 0
                            'codigorep = ""
                        End If

                        If contador > 0 Then
                            res += "<tr>"
                            res += "<td style=""color:white"">" & dt.Rows(i)("CODIGO_PRODUCTO").ToString() & "</td>"
                            'res += "<td data-order=""" & dt.Rows(i)("NOMBRE_PRODUCTO").ToString().ToUpper() & """></td>"
                            res += "<td style=""color:white"">" & dt.Rows(i)("NOMBRE_PRODUCTO").ToString().ToLower() & "</td>"
                            res += "<td style=""text-align: center"">" & dt.Rows(i)("SERIE").ToString() & "</td>"
                            res += "<td style=""text-align: center"">1</td>"
                            res += "<td style=""text-align: center"">" & dt.Rows(i)("FECHA_COMPRA").ToString() & "</td>"
                            res += "<td style=""text-align: center"">" & dt.Rows(i)("PRECIO_COSTO_SOLES").ToString() & "</td>"
                            res += "<td style=""text-align: center"">" & dt.Rows(i)("PRECIO_COSTO_DOLARES").ToString() & "</td>"
                            res += "</tr>"
                            'codigorep = ""
                        Else
                            res += "<tr style=""BACKGROUND-COLOR: rgb(223, 223, 223) !important;"">"
                            res += "<td style=""text-align: center"">" & dt.Rows(i)("CODIGO_PRODUCTO").ToString() & "</td>"
                            res += "<td >" & dt.Rows(i)("NOMBRE_PRODUCTO").ToString().ToUpper() & "</td>"
                            res += "<td style=""text-align: center"">" & "&nbsp;" & "</td>"
                            res += "<td style=""text-align: center"">" & dt.Rows(i)("CANTIDAD").ToString() & "</td>"
                            res += "<td style=""text-align: center"">" & "&nbsp;" & "</td>"
                            res += "<td style=""text-align: center"">" & "&nbsp;" & "</td>"
                            res += "<td style=""text-align: center"">" & "&nbsp;" & "</td>"
                            res += "</tr>"

                            res += "<tr>"
                            res += "<td style=""color:white"">" & dt.Rows(i)("CODIGO_PRODUCTO").ToString() & "</td>"
                            'res += "<td data-order=""" & dt.Rows(i)("NOMBRE_PRODUCTO").ToString().ToUpper() & """></td>"
                            res += "<td style=""color:white"">" & dt.Rows(i)("NOMBRE_PRODUCTO").ToString().ToLower() & "</td>"
                            res += "<td style=""text-align: center"">" & dt.Rows(i)("SERIE").ToString() & "</td>"
                            res += "<td style=""text-align: center"">1</td>"
                            res += "<td style=""text-align: center"">" & dt.Rows(i)("FECHA_COMPRA").ToString() & "</td>"
                            res += "<td style=""text-align: center"">" & dt.Rows(i)("PRECIO_COSTO_SOLES").ToString() & "</td>"
                            res += "<td style=""text-align: center"">" & dt.Rows(i)("PRECIO_COSTO_DOLARES").ToString() & "</td>"
                            res += "</tr>"

                            codigorep = dt.Rows(i)("CODIGO_PRODUCTO").ToString()
                        End If
                        'cantidad = dt.Rows(i)("CANTIDAD").ToString()
                    End If

                Catch ex As Exception
                    res += ""
                End Try

                'End If
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            GenerarTablaProSinDatos()
        End If
        Return res
    End Function

    Public Function GenerarTablaProSinDatos() As String
        res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
        res += "<thead>"
        res += "<tr align=""center"">"
        res += "<th>CODIGO</th>"
        res += "<th>DESCRIPCION</th>"
        res += "<th>SERIE</th>"
        res += "<th>CANTIDAD</th>"
        res += "<th>FECHA COMPRA</th>"
        res += "<th>COSTO SOLES</th>"
        res += "<th>COSTO DOLARES</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"
        res += "</tbody>"
        res += "</table>"
        Return res
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class






     