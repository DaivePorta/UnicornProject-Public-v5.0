Imports System.Data

Partial Class vistas_NO_NOMREQC
    Inherits Nomade.N.Cub

    'Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
    '    Try
    '        Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
    '        Dim dt As New DataTable
    '        Dim dtaux As New DataTable
    '        Dim sb As New StringBuilder()
    '        Dim cod_ant As String = ""
    '        Dim cod_sgt As String = ""
    '        Dim suma As New Double
    '        dt = CORegistroCompras.Listar_Req_Usua_Detalle("", "", "", Nothing, "", "A")
    '        If Not dt Is Nothing Then
    '            sb.Append("[")
    '            sb.Append("[")
    '            For i As Integer = 0 To dt.Rows.Count - 1
    '                If i + 1 >= dt.Rows.Count Then
    '                    cod_sgt = ""
    '                Else
    '                    cod_sgt = dt.Rows(i + 1)("CODIGO").ToString()
    '                End If
    '                'If i = 0 Then
    '                '    suma = Convert.ToDouble(dt.Rows(i)("CANTIDAD"))
    '                'End If

    '                '[{},



    '                sb.Append("{")
    '                sb.Append("""CODIGO"":" & """" & dt.Rows(i)("CODIGO") & """,")
    '                sb.Append("""CODIGO_REQ"":" & """" & dt.Rows(i)("CODIGO_REQ") & """,")
    '                sb.Append("""PRODUCTO"":" & """" & dt.Rows(i)("PRODUCTO") & """,")
    '                sb.Append("""ITEM"":" & """" & dt.Rows(i)("ITEM") & """,")
    '                sb.Append("""STOCK"":" & """" & dt.Rows(i)("STOCK") & """,")
    '                sb.Append("""CANTIDAD"":" & """" & dt.Rows(i)("CANTIDAD") & """")
    '                sb.Append("},")

    '                If (dt.Rows(i)("CODIGO").ToString().Equals(cod_ant)) Then

    '                    'sumar

    '                    suma = suma + Convert.ToDouble(dt.Rows(i)("CANTIDAD"))
    '                Else
    '                    suma = Convert.ToDouble(dt.Rows(i)("CANTIDAD"))

    '                End If
    '                If dt.Rows(i)("CODIGO").ToString() <> cod_sgt Then
    '                    'ingresas padre
    '                    '{}],
    '                    sb.Append("{")
    '                    sb.Append("""SUMA"":" & """" & IIf(suma = 0, dt.Rows(i)("CANTIDAD").ToString(), suma) & """,")
    '                    sb.Append("""PRODUCTO"":" & """" & dt.Rows(i)("PRODUCTO") & """,")
    '                    sb.Append("""STOCK"":" & """" & dt.Rows(i)("STOCK") & """,")
    '                    sb.Append("""CODIGO"":" & """" & dt.Rows(i)("CODIGO").ToString() & """")
    '                    sb.Append("},")
    '                    sb.Append("-")
    '                    sb.Replace("},-", "}")

    '                    sb.Append("],[")

    '                    suma = 0
    '                End If

    '                cod_ant = dt.Rows(i)("CODIGO").ToString


    '            Next

    '            sb.Append("]")
    '            sb.Replace(",[]", "]")

    '        End If
    '        Me.hfObjJson.Value = sb.ToString()
    '        CORegistroCompras = Nothing
    '    Catch ex As Exception
    '        Response.Write("Error " & ex.ToString)
    '    End Try
    'End Sub


    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()
            dt = CORegistroCompras.Listar_Req_Usua_Detalle("", "", "", Nothing, "", "A", "", "PADRES")
            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""PRODUCTO"":""" & row("PRODUCTO").ToString & """,")
                    sb.Append("""CANTIDAD"":""" & row("CANTIDAD").ToString & """,")
                    sb.Append("""COD_UNME"":""" & row("COD_UNME").ToString & """,")
                    sb.Append("""STOCK"":""" & row("STOCK").ToString & """,")
                    sb.Append("""CANTIDAD_PEDIDA"":""" & row("CANTIDAD_PEDIDA").ToString & """,")
                    sb.Append("""CANTIDAD_DESPACHADA"":""" & row("CANTIDAD_DESPACHADA").ToString & """")
                    sb.Append("},")
                Next

                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")
            End If
            Me.hfObjJson.Value = sb.ToString()
            CORegistroCompras = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub

End Class
