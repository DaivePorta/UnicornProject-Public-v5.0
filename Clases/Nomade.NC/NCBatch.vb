Public Class NCBatch
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function fListarTpoEjecucion() As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("sp_lista_tpoejecucion", CommandType.StoredProcedure)
            dt = cn.Consulta(cmd)

            If Not dt Is Nothing Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fListarTpoProceso() As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("sp_tpoproceso", CommandType.StoredProcedure)
            dt = cn.Consulta(cmd)

            If Not dt Is Nothing Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw ex
        End Try
    End Function


    Public Function fListaProcesoRef() As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_ListaProcesosRef", CommandType.StoredProcedure)
            dt = cn.Consulta(cmd)

            If Not dt Is Nothing Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fListarProcedimientos() As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_ListarProcedimiento", CommandType.StoredProcedure)
            dt = cn.Consulta(cmd)

            If Not dt Is Nothing Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fGrabarCierre(ByVal p_NombreProceso As String, _
                                  ByVal p_NombreProcedure As String, _
                                  ByVal p_TipoProceso As Integer, _
                                  ByVal p_TipoEjecucion As Integer, _
                                  ByVal p_Estado As String, _
                                  ByVal p_Observacion As String, _
                                  ByVal p_Nivel As Integer, _
                                  ByVal p_CodPadre As String) As String
        Try
            Dim msg As String = "OK"
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("INS_pcierre", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@v_NombreProceso", p_NombreProceso, ParameterDirection.InputOutput, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@v_NombreProcedure", p_NombreProcedure, ParameterDirection.InputOutput, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@v_TipoProceso", p_TipoProceso, ParameterDirection.InputOutput, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@v_TipoEjecucion", p_TipoEjecucion, ParameterDirection.InputOutput, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@v_Estado", p_Estado, ParameterDirection.InputOutput, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@v_Observacion", p_Observacion, ParameterDirection.InputOutput, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@v_Nivel", p_Nivel, ParameterDirection.InputOutput, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@v_CodPadre", p_CodPadre, ParameterDirection.InputOutput, 253))



            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_CODE").Value

            Return msg


        Catch ex As Exception
            Throw ex
            Return "Error " & ex.Message
        End Try
    End Function

    Public Function fListarProcesos_Nivel1() As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_ListaProcesos_Nivel1", CommandType.StoredProcedure)
            dt = cn.Consulta(cmd)

            If Not dt Is Nothing Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw ex
        End Try
        

    End Function

    Public Function fListarProceso_Child(ByVal pNivel As Integer, ByVal pCodPadre As Integer) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("Sp_ListarProcChild", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@v_Nivel", pNivel, ParameterDirection.InputOutput, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@v_Padre", pCodPadre, ParameterDirection.InputOutput, 253))

            dt = cn.Consulta(cmd)

            If Not dt Is Nothing Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fObtieneProcedure(ByVal pNombreProceso As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("Sp_ObtieneProcedure", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@pNombreProceso", pNombreProceso, ParameterDirection.InputOutput, 253))

            dt = cn.Consulta(cmd)

            If Not dt Is Nothing Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw ex
        End Try
    End Function


    Public Function EjecutaProc(ByVal NombreProc As String) As String
        Dim msg As String = "OK"
        Dim cmd As IDbCommand
        Dim cmd1 As IDbCommand
        Try
            cmd = cn.GetNewCommand(NombreProc, CommandType.StoredProcedure)
            cmd1 = cn.Ejecuta_parms(cmd)
            Return msg

        Catch ex As Exception
            Throw ex
            Return "Error " & ex.Message
        End Try
    End Function
End Class
