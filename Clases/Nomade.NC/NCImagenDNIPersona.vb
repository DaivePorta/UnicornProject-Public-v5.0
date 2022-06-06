Public Class NCImagenDNIPersona
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub




    Public Function ListarImagenFirma(ByVal p_pidm As String, ByVal P_TIPO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_FIRMA", CommandType.StoredProcedure)


            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", P_TIPO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearFirma(ByVal p_pidm As String, p_ruta As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFA_CREAR_FIRMA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_IMAGEN", p_ruta, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function ListarImagen(ByVal p_pidm As String, ByVal p_agrup As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_IMAGEN_DNI", CommandType.StoredProcedure)


            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AGRUP", p_agrup, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearImagen(ByVal p_pidm As String, p_ruta As String, ByVal P_tipo As String, ByVal p_user As String) As Array
        Try
            Dim msg(3) As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_IMAGEN_DNI", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RUTA_IMAGEN", p_ruta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", P_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGOSALIDA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = "OK"
            msg(1) = cmd1.Parameters("@p_CODIGOSALIDA").Value


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



End Class
