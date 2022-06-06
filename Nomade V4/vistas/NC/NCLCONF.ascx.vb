Imports System.Data


Partial Class vistas_NC_NCLCONF
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load

        Try
            Dim oConfig As New Nomade.NC.NCConfiguracionR("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = oConfig.Listar_ConfiguracionRegional(String.Empty, String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""codigo"":""" & row("codigo").ToString & """,")
                    sb.Append("""descripcion"":""" & row("descripcion").ToString & """,")
                    sb.Append("""desc_pais"":""" & row("desc_pais").ToString & """,")
                    sb.Append("""desc_idioma"":""" & row("desc_idioma").ToString & """,")
                    sb.Append("""desc_moneda"":""" & row("desc_moneda").ToString & """,")
                    sb.Append("""desc_zona_h"":""" & row("desc_zona_h").ToString & """,")
                    sb.Append("""separacion"":""" & row("separacion").ToString & """,")
                    sb.Append("""ubicacion"":""" & row("ubicacion").ToString & """,")                    
                    sb.Append("""estado"":""" & row("estado").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjCRegional.Value = sb.ToString()

            oConfig = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try

    End Sub



End Class
