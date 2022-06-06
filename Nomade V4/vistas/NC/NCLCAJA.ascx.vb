Imports System.Data

Partial Class vistas_NC_NCLCAJA
    Inherits Nomade.N.Cub


    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim caja As New Nomade.NC.NCCaja("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()
            'ccabrera 03/02/2014 se agregó parametro usuario responsable
            dt = caja.ListarCaja("", String.Empty, String.Empty, String.Empty, " ", "")
            If Not dt Is Nothing Then
                sb.Append("[")
                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                    sb.Append("""DESC_EMPRESA"":""" & row("DESC_EMPRESA").ToString & """,")
                    sb.Append("""SUCURSAL"":""" & row("SUCURSAL").ToString & """,")
                    sb.Append("""DESC_SUCURSAL"":""" & row("DESC_SUCURSAL").ToString & """,")
                    sb.Append("""DESC_TIPO"":""" & row("DESC_TIPO").ToString & """,")
                    sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                    sb.Append("""TELEFONO"":""" & row("TELEFONO").ToString & """,")
                    sb.Append("""ANEXO"":""" & row("ANEXO").ToString & """,")
                    sb.Append("""CONTACTO"":""" & row("CONTACTO").ToString & """,")
                    sb.Append("""RESPONSABLE"":""" & row("RESPONSABLE").ToString & """,")
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                    sb.Append("},")
                Next
                sb.Append("+")
                sb.Replace(",+", "")

                sb.Append("]")
            End If

            hfCajas.Value = sb.ToString()

            caja = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub

End Class
